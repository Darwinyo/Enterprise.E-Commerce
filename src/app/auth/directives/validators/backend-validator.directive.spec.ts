/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { BackEndValidatorDirective } from './backend-validator.directive';

describe('[AUTH] [DIRECTIVE] BACKEND-VALIDATOR-DIRECTIVE', () => {
  let directive: BackEndValidatorDirective;
  beforeEach(async(() => {
    directive = new BackEndValidatorDirective();
  }));
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  it('should return error obj when message not null', () => {
    directive.message = 'Cant connect to backend';
    const result = directive.validate(null);
    expect(result).toEqual({ backend: { error: 'Cant connect to backend' } });
  });
  it('should return null when message is null', () => {
    directive.message = null;
    const result = directive.validate(null);
    expect(result).toBe(null);
  });
});
