import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
const config = require('./config');
const colors = require('colors');
const moment = require('moment');

ScatterJS.plugins(new ScatterEOS());

const space = {
    s2: "  ",
    s4: "    ",
    s8: "        ",
    s16: "                "
};
const data = {
    scatter_account: null,
    account: null,
    eidos: 0,
    log: []
}
let network = config.nodes[Math.floor((Math.random() * config.nodes.length))];
network.blockchain = 'eos';
network.chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';
let eos;
const eosOptions = { expireInSeconds: 60 };

ScatterJS.scatter.connect('eidos-miner').then(connected => {
    if (!connected) {
        console.log(colors.bgRed('请安装并打开Scatter后打开本程序'));
        return false;
    };
    const scatter = ScatterJS.scatter;
    const requiredFields = { accounts: [network] };
    scatter.getIdentity(requiredFields).then(() => {
        data.scatter_account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
        eos = scatter.eos(network, Eos, eosOptions);
        mining();
        getAccount();
    }).catch(error => {
        console.error(error);
    });
    // scatter.login(requiredFields).then(() => {
    //     data.scatter_account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    //     eos = scatter.eos(network, Eos, eosOptions);
    //     mining();
    // }).catch(error => {
    //     console.error(error);
    // });
});
function mining() {
    const transactionOptions = { authorization: [`${data.scatter_account.name}@${data.scatter_account.authority}`] };
    eos.transfer(data.scatter_account.name, 'eidosonecoin', '0.0001 EOS', 'memo', transactionOptions).then(trx => {
        addLog(moment().format('YYYY-MM-DD HH:mm') + ` 挖矿成功!,Transaction ID: ${trx.transaction_id}`);
        setTimeout(mining, config.interval_second * 1000);
    }).catch(error => {
        error = JSON.parse(error);
        if (error.error && error.error.code == 3080004) {
            addLog(moment().format('YYYY-MM-DD HH:mm') + ' CPU已用完，' + config.cpu_wait_min + '分钟后继续...');
            setTimeout(mining, config.cpu_wait_min * 60 * 1000);
        } else {
            addLog(error);
            setTimeout(mining, config.interval_second * 1000);
        }
    });
}
function getAccount() {
    eos.getAccount(data.scatter_account.name).then(result => {
        data.account = result;
        getEidos();
    }).catch(error => {
        setTimeout(getAccount, config.refresh_account_second * 1000);
    });
}
function getEidos() {
    eos.getCurrencyBalance('eidosonecoin', data.scatter_account.name, 'EIDOS').then(result => {
        data.eidos = result[0];
        output();
        setTimeout(getAccount, config.refresh_account_second * 1000);
    }).catch(error => {
        setTimeout(getAccount, config.refresh_account_second * 1000);
    });
}
function output() {
    if (data.account) {
        console.clear();
        console.log('帐户:' + colors.brightGreen(data.scatter_account.name) + space.s4
            + 'EIDOS:' + colors.brightGreen(data.eidos) + space.s4
            + 'CPU:' + colors.bgGreen(data.account.cpu_limit.used + '/' + data.account.cpu_limit.max));
        console.log("");
        data.log.forEach(e => {
            console.log(e);
        });
    }
}
function addLog(str) {
    data.log.push(str);
    if (data.log.length > config.log_max) {
        data.log = data.log.slice(0, config.log_max);
    }
}