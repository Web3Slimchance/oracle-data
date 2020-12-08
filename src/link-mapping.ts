import { BigInt } from "@graphprotocol/graph-ts"
import {
  Transfer,
  Approval
} from "../generated/LinkToken/LinkToken"
import * as schema from "../generated/schema"

export function handleLinkTransfer(event: Transfer): void {
  let transfer = schema.Transfer.load(event.params.value.toHex())

  if (transfer == null) {
    transfer = new schema.Transfer(event.params.value.toHex())
    transfer.count = BigInt.fromI32(0)
  }

  if (transfer.totalVolume == null) {
    transfer.totalVolume  = BigInt.fromI32(0)
  }
  transfer.totalVolume = transfer.totalVolume + event.params.value

  transfer.count = transfer.count + BigInt.fromI32(1)
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.amount = event.params.value
  transfer.tokenName = "Chainlink"
  transfer.timestamp = event.block.timestamp
  transfer.blockNumber = event.block.number
  transfer.save()
}


export function handleLinkApproval(event: Approval): void {
  let approval = schema.Approval.load(event.params.value.toHex())

  if (approval == null) {
    approval = new schema.Approval(event.params.value.toHex())
    approval.count = BigInt.fromI32(0)
  }

  approval.count = approval.count + BigInt.fromI32(1)
  approval.owner = event.params.owner
  approval.spender = event.params.spender
  approval.amount = event.params.value
  approval.tokenName = "Chainlink"
  approval.timestamp = event.block.timestamp
  approval.blockNumber = event.block.number
  approval.save()
}
