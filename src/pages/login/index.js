import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FootBar from '../../components/common/footer';
import FormLogin from './formLogin';
import FormRegister from './formRegister';
import './index.scss'

@inject(({globalStore})=>({
    login: globalStore.login
}))

@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'login'
        };
    }
    componentWillMount() {
        const pathname = this.props.history.location.pathname
        if (pathname === '/register') {
            this.setState({
                mode: 'register'
            })
        }
    }
    changeMode = e => {
        this.setState({
            mode: e
        })
    }
    render() {
        return (
            <div className='login-container' style={{ height: '100vh' }}>
                <div className="login-header">
                    <img src={require('../../assets/images/aimei_logo.png')} />
                    <span>medaOS</span>
                </div>
                <div className="login-body">
                    {
                        this.state.mode === "login"
                        ? <FormLogin toRegister={()=>this.changeMode('register')} />
                        : <FormRegister toLogin={()=>this.changeMode('login')} />
                    }
                </div>
                <div className='login-footer'>
                    <FootBar />
                </div>
            </div>
        );
    }
}

export default Login;
