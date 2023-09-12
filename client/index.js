const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const prompt = require("prompt-sync")();

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  console.log(root);
  const name = prompt("which name do you want to check");
  if (name == null) {
    alert("You have to enter a name");
  }
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    proof,
  });

  console.log({ gift });
}

main();
