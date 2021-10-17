import { convertToParamMap, ParamMap, Params } from '@angular/router';

interface RouteSnapshot {
  paramMap: ParamMap;
}

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class RouteSnapshotStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  public snapshot?: RouteSnapshot;
  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** Set the paramMap observable's next value */
  setParamMap(params: Params = {}) {
    this.snapshot = { paramMap: convertToParamMap(params) };
  }
}
