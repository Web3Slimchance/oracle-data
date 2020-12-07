import { BigInt } from "@graphprotocol/graph-ts"
import {
  LinkToken,
  Transfer,
  Approval
} from "../generated/LinkToken/LinkToken"
import * as schema from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let transfer = schema.Transfer.load(event.params._amount.toHex())

  if (transfer == null) {
    transfer = new schema.Transfer(event.params._amount.toHex())
    transfer.count = BigInt.fromI32(0)
  }

  transfer.count = transfer.count + BigInt.fromI32(1)
  transfer.from = event.params._from
  transfer.to = event.params._to
  transfer.amount = event.params._amount
  transfer.save()
}


export function handleApproval(event: Approval): void {
  let approval = schema.Approval.load(event.params._amount.toHex())

  if (approval == null) {
    approval = new schema.Approval(event.params._amount.toHex())
    approval.count = BigInt.fromI32(0)
  }

  approval.count = approval.count + BigInt.fromI32(1)
  approval.owner = event.params._owner
  approval.spender = event.params._spender
  approval.amount = event.params._amount
  approval.save()
}
