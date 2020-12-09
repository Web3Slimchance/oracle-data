import { BigInt } from '@graphprotocol/graph-ts'
import { handleTransfer, handleApproval, TransferEvent, ApprovalEvent } from "./helpers"

export function handleDIATransfer(event: TransferEvent): void {
  var tokenName = "DIA"
  handleTransfer(tokenName, event)
}

export function handleDIAApproval(event: ApprovalEvent): void {
  var tokenName = "DIA"
  handleApproval(tokenName, event)
}
