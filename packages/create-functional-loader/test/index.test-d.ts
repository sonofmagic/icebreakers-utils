import { createLoader } from '../src'
import { expectType } from 'tsd'
import webpack5 from 'webpack'
// import webpack4 from 'webpack4'
expectType<webpack5.RuleSetUseItem>(createLoader(function () {}))
// expectType<Partial<webpack4.NewLoader>>(createLoader(function () {}))
