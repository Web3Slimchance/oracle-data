import { BigInt } from "@graphprotocol/graph-ts"
import {
  LinkToken,
  Transfer,
  Approval
} from "../generated/LinkToken/LinkToken"
import { Transfer, Approval } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let transfer = Transfer.load(event.params._amount.toHex())

  if (transfer == null) {
    transfer = new Transfer(event.params._amount.toHex())
    transfer.count = BigInt.fromI32(0)
  }

  transfer.count = transfer.count + BigInt.fromI32(1)
  transfer._from = event.params._from
  transfer._to = event.params._to
  transfer._amount = event.params._amount
  transfer.save()
}


export function handleApproval(event: Approval): void {
  let approval = Approval.load(event.params._amount.toHex())

  if (approval == null) {
    approval = new Approval(event.params._amount.toHex())
    approval.count = BigInt.fromI32(0)
  }

  approval.count = approval.count + BigInt.fromI32(1)
  approval._owner = event.params._owner
  approval._spender = event.params._spender
  approval._amount = event.params._amount
  approval.save()
}
