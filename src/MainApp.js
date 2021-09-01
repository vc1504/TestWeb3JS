import React, {Component} from 'react';
import Button from './component/Button';
import Label from './component/Label';
import web3 from './component/Web3Js';



class MainApp extends Component{

    async componentWillMount(){
        if(web3){
            await window.ethereum.enable().then(this.handleAccountsChanged);
        }

        if( await web3.eth.net.getId() !== 42){
           this.enableSwitching();
        }
        else{
            this.enableCheckBalance();
        }
    }

    handleAccountsChanged(){
        window.ethereum.on('chainChanged', _chainId => window.location.reload());
    }

    async viewBalance(){
        const accounts = await web3.eth.getAccounts();
        const balance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]));
        this.setState({
            networktext : "Your Balance is " + balance
        });
    }

    async changeNetwork(){
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x2a' }],
        });
        
    }

    async enableCheckBalance(){
        let network = await web3.eth.net.getNetworkType();
        this.setState({
            networktext : "You are on " + network + " network. Click on view balance button.",
            viewbalancedisabled: '',
            changedisabled:'disabled'
        })
    }

    async enableSwitching(){
        let network = await web3.eth.net.getNetworkType();
        this.setState({
            networktext : "You are on " + network + " network. Click on change button to change to kovan.",
            viewbalancedisabled: 'disabled',
            changedisabled:''
        });
    }

    constructor(props) {
        super(props)
        this.state = {
            networktext: '',
            viewbalancedisabled: '',
            changedisabled:''
        }
    }

    render(){
        return(
            <div className="center">
                <span><Label text={this.state.networktext}/></span>
                <span><Button id="viewBalance" classname="btn" label="View Balance" disabled={this.state.viewbalancedisabled} onClick={async () => {await this.viewBalance();} } /></span>
                <span><Button id="change" classname="btn-sec" label="Change" disabled={this.state.changedisabled} onClick={async () =>{await this.changeNetwork()}} /></span>              
            </div>

        )
    }
}

export default MainApp;