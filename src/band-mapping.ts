import { BigInt } from '@graphprotocol/graph-ts'
import { handleTransfer, handleApproval, TransferEvent, ApprovalEvent } from "./helpers"

export function handleBandTransfer(event: TransferEvent): void {
  var tokenName = "Band Protocol"
  handleTransfer(tokenName, event)
}

export function handleBandApproval(event: ApprovalEvent): void {
  var tokenName = "Band Protocol"
  handleApproval(tokenName, event)
}
