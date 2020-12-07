import { BigInt } from "@graphprotocol/graph-ts"
import {
  MiniMeToken,
  ClaimedTokens,
  Transfer,
  NewCloneToken,
  Approval
} from "../generated/MiniMeToken/MiniMeToken"
import { _ClaimedTokens, _Transfer, _NewCloneToken, _Approval } from "../generated/schema"

export function handleClaimedTokens(event: ClaimedTokens): void {
  let claimedTokens = _ClaimedTokens.load(event.params._amount.toHex())

  if (claimedTokens == null) {
    claimedTokens = new _ClaimedTokens(event.params._amount.toHex())
    claimedTokens.count = BigInt.fromI32(0)
  }

  claimedTokens.count = claimedTokens.count + BigInt.fromI32(1)
  claimedTokens._token = event.params._token
  claimedTokens._controller = event.params._controller
  claimedTokens._amount = event.params._amount
  claimedTokens.save()
}

export function handleTransfer(event: Transfer): void {
  let transfer = _Transfer.load(event.params._amount.toHex())

  if (transfer == null) {
    transfer = new _Transfer(event.params._amount.toHex())
    transfer.count = BigInt.fromI32(0)
  }

  transfer.count = transfer.count + BigInt.fromI32(1)
  transfer._from = event.params._from
  transfer._to = event.params._to
  transfer._amount = event.params._amount
  transfer.save()
}

export function handleNewCloneToken(event: NewCloneToken): void {
  let transfer = _NewCloneToken.load(event.params._cloneToken.toHex())

  if (transfer == null) {
    transfer = new _NewCloneToken(event.params._cloneToken.toHex())
    transfer.count = BigInt.fromI32(0)
  }

  transfer.count = transfer.count + BigInt.fromI32(1)
  transfer._cloneToken = event.params._cloneToken
  transfer._snapshotBlock = event.params._snapshotBlock
  transfer.save()
}

export function handleApproval(event: Approval): void {
  let approval = _Approval.load(event.params._amount.toHex())

  if (approval == null) {
    approval = new _Approval(event.params._amount.toHex())
    approval.count = BigInt.fromI32(0)
  }

  approval.count = approval.count + BigInt.fromI32(1)
  approval._owner = event.params._owner
  approval._spender = event.params._spender
  approval._amount = event.params._amount
  approval.save()
}
