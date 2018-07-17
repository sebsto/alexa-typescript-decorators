'use strict';

import 'mocha';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { Assertion } from './utils/Assertion';
const A = new Assertion();
let skill_response: ResponseEnvelope;

import { handler as skill } from '../src/index';

import * as r from './request/SkillDisabledEvent.json';
const request : RequestEnvelope = <RequestEnvelope>r;

describe('SkillDisabledEvent', () => {

  before( () => {

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

});