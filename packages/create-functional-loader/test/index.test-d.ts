import { createLoader } from '../src'
import { expectType } from 'tsd'
import webpack5 from 'webpack'
import webpack4 from 'webpack4'
expectType<webpack5.RuleSetUseItem>(createLoader(function () {}))
expectType<webpack5.RuleSetUseItem>(createLoader<5>(function () {}))
expectType<Partial<webpack4.NewLoader>>(createLoader<4>(function () {}))
