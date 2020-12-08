import { BigInt } from "@graphprotocol/graph-ts"
import {
  Transfer,
  Approval
} from "../generated/TellorMaster/TellorMaster"
import * as schema from "../generated/schema"

export function handleTellorTransfer(event: Transfer): void {
  let transfer = schema.Transfer.load(event.params.value.toHex())

  if (transfer == null) {
    transfer = new schema.Transfer(event.params.value.toHex())
    transfer.count = BigInt.fromI32(0)
  }

  transfer.count = transfer.count + BigInt.fromI32(1)
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.amount = event.params.value
  transfer.contractName = "TellorMaster"
  transfer.timestamp = event.block.timestamp
  transfer.blockNumber = event.block.number
  transfer.save()
}


export function handleTellorApproval(event: Approval): void {
  let approval = schema.Approval.load(event.params.value.toHex())

  if (approval == null) {
    approval = new schema.Approval(event.params.value.toHex())
    approval.count = BigInt.fromI32(0)
  }

  approval.count = approval.count + BigInt.fromI32(1)
  approval.owner = event.params.owner
  approval.spender = event.params.spender
  approval.amount = event.params.value
  approval.contractName = "TellorMaster"
  approval.timestamp = event.block.timestamp
  approval.blockNumber = event.block.number
  approval.save()
}
