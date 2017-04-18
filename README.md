# RedditRegister

## Building

1. First run `truffle compile`, then run `truffle migrate` to deploy the contracts onto your network of choice (default "development").
1. Then run `truffle test` to run basic tests

## Some notes

* Pull larger json blob from reddit via Oraclize and parse it (I've looked at jsmnsol-lib). This would mean a single Oraclize call which would be simpler, but more tricky parsing. In particular with jsmnsol-lib you would need to walk over each json token, checking for key / value pairs that match. On the plus side we could store more information related to the account.

* Refund excess msg.value to caller. Some msg.value is required to fund the Oraclize calls - currently the contract throws if too little is sent, but ignores too much being sent. Ideally this would be done with a withdraw contract (perhaps using Zepplin's withdrawable approach) to avoid stack overflow / bad fallback functions etc..

* Contract required posted address (on reddit.com/r/ethereumproofs) to be all lower-case. The address parsing logic in Oraclize library requires this. This function could be re-written to be more forgiving.

* Writing tests is tricky with Oraclize as it is effectively "asynchronous". More effort required to write a full test suite.

* NB - I've found Oraclize on the test-net (I was using Ropsten) to be quite flacky - sometimes callbacks happen, sometimes they don't, and in addition they don't always return consistent data.
