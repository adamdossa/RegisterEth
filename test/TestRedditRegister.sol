pragma solidity ^0.4.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/RedditRegister.sol";

contract TestRedditRegister is RedditRegister {

  function testParseResult_noSpeechMarks() {
    string memory res1 = 'this is a test';
    string memory res2 = 'this is a different test';
    string memory orig = '[this is a test,this is a different test]';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, false, 'Parsing should failed - missing speech marks');
  }
  function testParseResult_withSpeechMarks_0() {
    string memory res1 = "adamaid_321";
    string memory res2 = "0x85523d0f76b3a6c3c05b2cfbb0558b45541f100b";
    string memory orig = '["adamaid_321", "0x85523d0f76b3a6c3c05b2cfbb0558b45541f100b"]';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, true, 'Parsing should not fail');
    Assert.equal(name, res1, "Parsing token 1 failed");
    Assert.equal(addr, res2, "Parsing token 2 failed");
  }
  function testParseResult_withSpeechMarks_1() {
    string memory res1 = 'this is a test';
    string memory res2 = 'this is a different test';
    string memory orig = '["this is a test", "this is a different test"]';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, true, 'Parsing should not fail');
    Assert.equal(name, res1, "Parsing token 1 failed");
    Assert.equal(addr, res2, "Parsing token 2 failed");
  }
  function testParseResult_withSpeechMarks_2() {
    string memory res1 = 'this is a test';
    string memory res2 = 'this is a different test';
    string memory orig = '[ "this is a test","this is a different test" ]';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, true, 'Parsing should not fail');
    Assert.equal(name, res1, "Parsing token 1 failed");
    Assert.equal(addr, res2, "Parsing token 2 failed");
  }
  function testParseResult_withSpeechMarks_3() {
    string memory res1 = '';
    string memory res2 = 'this is a different test';
    string memory orig = '["" , "this is a different test"]';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, true, 'Parsing should not fail');
    Assert.equal(name, res1, "Parsing token 1 failed");
    Assert.equal(addr, res2, "Parsing token 2 failed");
  }
  function testParseResult_withSpeechMarks_4() {
    string memory res1 = 'this is a different test';
    string memory res2 = '';
    string memory orig = '["this is a different test", ""]';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, true, 'Parsing should not fail');
    Assert.equal(name, res1, "Parsing token 1 failed");
    Assert.equal(addr, res2, "Parsing token 2 failed");
  }
  function testParseResult_withSpeechMarks_5() {
    string memory res1 = '';
    string memory res2 = '';
    string memory orig = '["" , ""]';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, true, 'Parsing should not fail');
    Assert.equal(name, res1, "Parsing token 1 failed");
    Assert.equal(addr, res2, "Parsing token 2 failed");
  }
  function testParseResult_longerArray() {
    string memory orig = '["this is a test", "and some more", "with an extra one!"]';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, false, 'Parsing should failed');
  }
  function testParseResult_singleArray() {
    string memory orig = '["this is a test"]';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, false, 'Parsing should failed');
  }
  function testParseResult_scalar() {
    string memory orig = 'this is a test';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, false, 'Parsing should failed');
  }
  function testParseResult_nonsense() {
    string memory orig = '[asf, asfas,adsgadgpjo ds,d sgdsgtewf]';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, false, 'Parsing should failed');
  }
  function testParseResult_empty() {
    string memory orig = '';
    var (success, name, addr) = parseResult(orig);
    Assert.equal(success, false, 'Parsing should failed');
  }
}
