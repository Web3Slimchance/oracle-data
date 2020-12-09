import { BigInt, ethereum, Address } from '@graphprotocol/graph-ts'
import * as schema from "../generated/schema"

export class TransferEvent extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: TransferEvent;

  constructor(event: TransferEvent) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalEvent extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: ApprovalEvent;

  constructor(event: ApprovalEvent) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get spender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}


export function handleTransfer(tokenName: string, event: TransferEvent): void {
  let transfer = schema.Transfer.load(event.params.value.toHex())

  if (transfer == null) {
    transfer = new schema.Transfer(event.params.value.toHex())
    transfer.count = BigInt.fromI32(0)
  }

  transfer.count = transfer.count + BigInt.fromI32(1)
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.amount = event.params.value.toBigDecimal()
  transfer.tokenName = tokenName
  transfer.timestamp = event.block.timestamp
  transfer.blockNumber = event.block.number

  let analytic = schema.Analytic.load(tokenName)
  if (analytic == null) {
    analytic = new schema.Analytic(tokenName)
    analytic.totalVolume = BigInt.fromI32(0).toBigDecimal()
  }

  analytic.tokenName = tokenName
  analytic.totalVolume = analytic.totalVolume + transfer.amount
  transfer.totalVolume = analytic.totalVolume
  transfer.save()
  analytic.save()
}

export function handleApproval(tokenName: string, event: ApprovalEvent): void {
  let approval = schema.Approval.load(event.params.value.toHex())

  if (approval == null) {
    approval = new schema.Approval(event.params.value.toHex())
    approval.count = BigInt.fromI32(0)
  }

  approval.count = approval.count + BigInt.fromI32(1)
  approval.owner = event.params.owner
  approval.spender = event.params.spender
  approval.amount = event.params.value.toBigDecimal()
  approval.tokenName = tokenName
  approval.timestamp = event.block.timestamp
  approval.blockNumber = event.block.number
  approval.save()
}