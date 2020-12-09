import { BigInt } from '@graphprotocol/graph-ts'
import { handleTransfer, handleApproval, TransferEvent, ApprovalEvent } from "./helpers"

export function handleTellorTransfer(event: TransferEvent): void {
  var tokenName = "Tellor"
  handleTransfer(tokenName, event)
}

export function handleTellorApproval(event: ApprovalEvent): void {
  var tokenName = "Tellor"
  handleApproval(tokenName, event)
}
