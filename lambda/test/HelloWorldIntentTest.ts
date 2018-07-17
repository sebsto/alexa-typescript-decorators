'use strict';

import 'mocha';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { Assertion } from './utils/Assertion';
const A = new Assertion();
let skill_response: ResponseEnvelope;

import { handler as skill } from '../src/index';

import * as r from './request/HelloWorldIntent.json';
const request : RequestEnvelope = <RequestEnvelope>r;
//const request = r;

describe('Hello World Intent', function() {

  before( () => {
    this.timeout(5000);

    return new Promise((resolve, reject) => {
      skill(request, null, (error, responseEnvelope) => {
        skill_response = responseEnvelope;
        resolve();
        });
    });    
  });
  
  it('it responds with valid response structure ', () => {
    A.checkResponseStructure(skill_response);
  });

  it('it closes the session ', () => {
    A.checkSessionStatus(skill_response, true);
  });

  it('it contains output speech', () => {
    A.checkOutputSpeach(skill_response);
  });

});