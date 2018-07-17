'use strict';

import 'mocha';

import { handler as skill } from '../src/index';

import * as r from './request/HelpIntentRequest.json';
const request: RequestEnvelope = <RequestEnvelope>r;

import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { Assertion } from './utils/Assertion';
const A = new Assertion();
let skill_response: ResponseEnvelope;

describe('Help', () => {

  before(() => {

    return new Promise((resolve, reject) => {
      // prepare the database
      skill(request, null, (error, responseEnvelope) => {
        skill_response = responseEnvelope;
        resolve();
      });
    });
  });

  it('it responds with valid response structure ', () => {
    A.checkResponseStructure(skill_response);
  });

  it('it keeps the session open', () => {
    A.checkSessionStatus(skill_response, false);
  });

});