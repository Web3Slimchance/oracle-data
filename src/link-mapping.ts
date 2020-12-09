import { BigInt } from '@graphprotocol/graph-ts'
import { handleTransfer, handleApproval, TransferEvent, ApprovalEvent } from "./helpers"

export function handleLinkTransfer(event: TransferEvent): void {
  var tokenName = "Chainlink"
  handleTransfer(tokenName, event)
}

export function handleLinkApproval(event: ApprovalEvent): void {
  var tokenName = "Chainlink"
  handleApproval(tokenName, event)
}
