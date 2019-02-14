import React, {Component} from 'react';
import './style.css';

// import PropTypes from 'prop-types';

class ErrorToast extends Component {
  render() {

    const {msg} = this.props;

    return (
      <div className="errorToast">
        <div className="errorToast_text">{msg}</div>
      </div>
    );
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.clearError(); // 重置 错误信息
    }, 3000);
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }
}

// ErrorToast.propTypes = {};

export default ErrorToast;
