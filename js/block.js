
let latestKnownBlockNumber = -1;
let blockTime = 550;

// Our function that will triggered for every block
async function processBlock(blockNumber) {
    const web3 = new Web3('https://smartbch.fountainhead.cash/mainnet/');


    console.log("We process block: " + blockNumber);
    let block = await web3.eth.getBlock(blockNumber);
    console.log("new block :", block)
    for (const transactionHash of block.transactions) {
        let transaction = await web3.eth.getTransaction(transactionHash);
        let transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
        transaction = Object.assign(transaction, transactionReceipt);
        console.log("Transaction: ", transaction);

    let abi = [ { "inputs": [ { "internalType": "address", "name": "_feeToSetter", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "token0", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token1", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "PairCreated", "type": "event" }, { "inputs": [], "name": "INIT_CODE_PAIR_HASH", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "allPairs", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "allPairsLength", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" } ], "name": "createPair", "outputs": [ { "internalType": "address", "name": "pair", "type": "address" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feeTo", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feeToSetter", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "getPair", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "migrator", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_feeTo", "type": "address" } ], "name": "setFeeTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_feeToSetter", "type": "address" } ], "name": "setFeeToSetter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_migrator", "type": "address" } ], "name": "setMigrator", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
 
    let distributorABI = [ { "inputs": [ { "internalType": "contract IBoringERC20", "name": "_ember", "type": "address" }, { "internalType": "uint256", "name": "_emberPerSec", "type": "uint256" }, { "internalType": "address", "name": "_teamAddress", "type": "address" }, { "internalType": "address", "name": "_treasuryAddress", "type": "address" }, { "internalType": "address", "name": "_investorAddress", "type": "address" }, { "internalType": "uint256", "name": "_teamPercent", "type": "uint256" }, { "internalType": "uint256", "name": "_treasuryPercent", "type": "uint256" }, { "internalType": "uint256", "name": "_investorPercent", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "indexed": true, "internalType": "contract IBoringERC20", "name": "lpToken", "type": "address" }, { "indexed": false, "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" }, { "indexed": false, "internalType": "uint256", "name": "harvestInterval", "type": "uint256" }, { "indexed": true, "internalType": "contract IComplexRewarder[]", "name": "rewarders", "type": "address[]" } ], "name": "Add", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newAmount", "type": "uint256" } ], "name": "AllocPointsUpdated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousValue", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newValue", "type": "uint256" } ], "name": "EmissionRateUpdated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountLockedUp", "type": "uint256" } ], "name": "RewardLockedUp", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "indexed": false, "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" }, { "indexed": false, "internalType": "uint256", "name": "harvestInterval", "type": "uint256" }, { "indexed": true, "internalType": "contract IComplexRewarder[]", "name": "rewarders", "type": "address[]" } ], "name": "Set", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" } ], "name": "SetInvestorAddress", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "oldPercent", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newPercent", "type": "uint256" } ], "name": "SetInvestorPercent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" } ], "name": "SetTeamAddress", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "oldPercent", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newPercent", "type": "uint256" } ], "name": "SetTeamPercent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" } ], "name": "SetTreasuryAddress", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "oldPercent", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newPercent", "type": "uint256" } ], "name": "SetTreasuryPercent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lastRewardTimestamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lpSupply", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "accEmberPerShare", "type": "uint256" } ], "name": "UpdatePool", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "MAXIMUM_DEPOSIT_FEE_RATE", "outputs": [ { "internalType": "uint16", "name": "", "type": "uint16" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAXIMUM_HARVEST_INTERVAL", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IBoringERC20", "name": "_lpToken", "type": "address" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "uint256", "name": "_harvestInterval", "type": "uint256" }, { "internalType": "contract IComplexRewarder[]", "name": "_rewarders", "type": "address[]" } ], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "canHarvest", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "pid", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "depositWithPermit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "ember", "outputs": [ { "internalType": "contract IBoringERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "emberPerSec", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256[]", "name": "_pids", "type": "uint256[]" } ], "name": "harvestMany", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "investorAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "investorPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "pendingTokens", "outputs": [ { "internalType": "address[]", "name": "addresses", "type": "address[]" }, { "internalType": "string[]", "name": "symbols", "type": "string[]" }, { "internalType": "uint256[]", "name": "decimals", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "poolInfo", "outputs": [ { "internalType": "contract IBoringERC20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "accEmberPerShare", "type": "uint256" }, { "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" }, { "internalType": "uint256", "name": "harvestInterval", "type": "uint256" }, { "internalType": "uint256", "name": "totalLp", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "poolRewarders", "outputs": [ { "internalType": "address[]", "name": "rewarders", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "poolRewardsPerSec", "outputs": [ { "internalType": "address[]", "name": "addresses", "type": "address[]" }, { "internalType": "string[]", "name": "symbols", "type": "string[]" }, { "internalType": "uint256[]", "name": "decimals", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "rewardsPerSec", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "pid", "type": "uint256" } ], "name": "poolTotalLp", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "uint256", "name": "_harvestInterval", "type": "uint256" }, { "internalType": "contract IComplexRewarder[]", "name": "_rewarders", "type": "address[]" } ], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_investorAddress", "type": "address" } ], "name": "setInvestorAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_newInvestorPercent", "type": "uint256" } ], "name": "setInvestorPercent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_teamAddress", "type": "address" } ], "name": "setTeamAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_newTeamPercent", "type": "uint256" } ], "name": "setTeamPercent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_treasuryAddress", "type": "address" } ], "name": "setTreasuryAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_newTreasuryPercent", "type": "uint256" } ], "name": "setTreasuryPercent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startFarming", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startTimestamp", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "teamAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "teamPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalEmberInPools", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalLockedUpRewards", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "treasuryAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "treasuryPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" } ], "name": "updateAllocPoint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_emberPerSec", "type": "uint256" } ], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "userInfo", "outputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }, { "internalType": "uint256", "name": "rewardLockedUp", "type": "uint256" }, { "internalType": "uint256", "name": "nextHarvestUntil", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]
    let vaultabi = [
        {
          "inputs": [
            {
              "internalType": "contract IEmberERC20",
              "name": "_ember",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_emberPerBlock",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "caller",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "previousAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "newAmount",
              "type": "uint256"
            }
          ],
          "name": "AllocPointsUpdated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "Deposit",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "caller",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "oldAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAddress",
              "type": "address"
            }
          ],
          "name": "DevAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "EmergencyWithdraw",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "caller",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "previousAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "newAmount",
              "type": "uint256"
            }
          ],
          "name": "EmissionRateUpdated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "caller",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "oldAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAddress",
              "type": "address"
            }
          ],
          "name": "FeeAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "caller",
              "type": "address"
            }
          ],
          "name": "MetaTxnsDisabled",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "caller",
              "type": "address"
            }
          ],
          "name": "MetaTxnsEnabled",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOperator",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOperator",
              "type": "address"
            }
          ],
          "name": "OperatorTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountLockedUp",
              "type": "uint256"
            }
          ],
          "name": "RewardLockedUp",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "Withdraw",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "MAXIMUM_DEPOSIT_FEE_RATE",
          "outputs": [
            {
              "internalType": "uint16",
              "name": "",
              "type": "uint16"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "MAXIMUM_HARVEST_INTERVAL",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_allocPoint",
              "type": "uint256"
            },
            {
              "internalType": "contract IERC20",
              "name": "_lpToken",
              "type": "address"
            },
            {
              "internalType": "uint16",
              "name": "_depositFeeBP",
              "type": "uint16"
            },
            {
              "internalType": "uint256",
              "name": "_harvestInterval",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_lockupDuration",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "_withUpdate",
              "type": "bool"
            }
          ],
          "name": "add",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            }
          ],
          "name": "canHarvest",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "devAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "disableMetaTxns",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "ember",
          "outputs": [
            {
              "internalType": "contract IEmberERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "emberPerBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "enableMetaTxns",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "feeAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_from",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_to",
              "type": "uint256"
            }
          ],
          "name": "getMultiplier",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "forwarder",
              "type": "address"
            }
          ],
          "name": "isTrustedForwarder",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "massUpdatePools",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "metaTxnsEnabled",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "operator",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            }
          ],
          "name": "pendingEmber",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "poolInfo",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "lpToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "allocPoint",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastRewardBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "accEmberPerShare",
              "type": "uint256"
            },
            {
              "internalType": "uint16",
              "name": "depositFeeBP",
              "type": "uint16"
            },
            {
              "internalType": "uint256",
              "name": "harvestInterval",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalLp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lockupDuration",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "poolLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_devAddress",
              "type": "address"
            }
          ],
          "name": "setDevAddress",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_feeAddress",
              "type": "address"
            }
          ],
          "name": "setFeeAddress",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "startBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "startFarming",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalAllocPoint",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalEmberInPools",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalLockedUpRewards",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOperator",
              "type": "address"
            }
          ],
          "name": "transferOperator",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_allocPoint",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "_withUpdate",
              "type": "bool"
            }
          ],
          "name": "updateAllocPoint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_emberPerBlock",
              "type": "uint256"
            }
          ],
          "name": "updateEmissionRate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
            }
          ],
          "name": "updatePool",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "userInfo",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rewardDebt",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rewardLockedUp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nextHarvestUntil",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastInteraction",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            }
          ],
          "name": "userLockedUntil",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
    let emberabi = 
    [
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "balance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
          {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    ]

    
    let tokenAddress = "0xE62983a68679834eD884B9673Fb6aF13db740fF0";
    let distributorAddress= "0x8ecb32C33AB3f7ee3D6Ce9D4020bC53fecB36Be9";
    let vaultAddress= "0xFFbE92fDA81f853bcf00d3c7686d5DAd5A6600bB";
    let emberAddress = "0x6BAbf5277849265b6738e75AEC43AEfdde0Ce88D"
    const UniswapToken  = new web3.eth.Contract(abi, tokenAddress);
    const Distributor   = new web3.eth.Contract(distributorABI, distributorAddress);
    const Vault         = new web3.eth.Contract(vaultabi, vaultAddress);
    const Ember         = new web3.eth.Contract(emberabi, emberAddress);
    (async () => {
        let Embersupply         =         await Ember.methods.totalSupply().call();
        let burnbalance         =         await Ember.methods.balanceOf("0x000000000000000000000000000000000000dEaD").call();
        let Distributorbalance  =         await Distributor.methods.emberPerSec().call();
        let Vaultbalance        =         await Vault.methods.emberPerBlock().call(); 
        let Vaultlocked         =         await Vault.methods.totalEmberInPools().call();
        let vaultpercent        =         ((Vaultlocked)/(Embersupply-burnbalance)*100).toFixed(2)
        let vaultlocked         =               (Vaultlocked/1e18).toFixed(0)
        let totalbalance        =               (((Distributorbalance/1e18)*5.5) + (Vaultbalance/1e18)).toFixed(2)

        let balance =             await UniswapToken.methods.allPairsLength().call();
                                    document.getElementById("LiquidityPools").innerHTML = await balance + "<span>+</span>";
                                    document.getElementById("LiquidityFarms").innerHTML = (totalbalance.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
                                    document.getElementById("LiquidityLocked").innerHTML = (vaultlocked.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
                                    document.getElementById("VaultPercent").innerHTML = vaultpercent

                                  })();
        // Do whatever you want here
    }
    latestKnownBlockNumber = blockNumber;
}

// This function is called every blockTime, check the current block number and order the processing of the new block(s)
async function checkCurrentBlock() {
    const web3 = new Web3('https://smartbch.fountainhead.cash/mainnet/');
    const currentBlockNumber = await web3.eth.getBlockNumber()
    console.log("Current blockchain top: " + currentBlockNumber, " | Script is at: " + latestKnownBlockNumber);
    while (latestKnownBlockNumber == -1 || currentBlockNumber > latestKnownBlockNumber) {
        await processBlock(latestKnownBlockNumber == -1 ? currentBlockNumber : latestKnownBlockNumber + 1);
    }
    setTimeout(checkCurrentBlock, blockTime);
}

checkCurrentBlock()