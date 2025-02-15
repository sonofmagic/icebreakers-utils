import type webpack5 from 'webpack'
import type webpack4 from 'webpack4'
import { expectType } from 'tsd'
import { createLoader } from '../src'

expectType<webpack5.RuleSetUseItem>(createLoader(() => {}))
expectType<webpack5.RuleSetUseItem>(createLoader<5>(() => {}))
expectType<Partial<webpack4.NewLoader>>(createLoader<4>(() => {}))
