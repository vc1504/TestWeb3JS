import React, {Component} from 'react';
import Button from './component/Button';
import Label from './component/Label';
import Web3 from 'web3';



class MainApp extends Component{
    async componentWillMount(){
        await this.loadWeb3();
    }

    async loadWeb3(){
        let web3 = new Web3(Web3.givenProvider);
        const networkId = await web3.eth.net.getId();
        const network = await web3.eth.net.getNetworkType();
        await window.ethereum.enable();

        if(networkId !== 42){
            this.setState({
                networktext : "You are on " + network + " network. Click on change button to change to kovan.",
                viewbalancedisabled: 'disabled',
                changedisabled:''
            });
        }
        else{
            this.setState({
                networktext : "You are on " + network + " network. Click on view balance button.",
                viewbalancedisabled: '',
                changedisabled:'disabled'
            });
        }
    }

    async viewBalance(){
        let web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        this.setState({
            networktext : "Your Balance is " + balance
        });
    }

    async changeNetwork(){
        let web3 = new Web3(Web3.givenProvider);
        
        web3.setProvider(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'));
        await window.ethereum.enable();
        console.log(await web3.eth.net.getNetworkType());
        
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