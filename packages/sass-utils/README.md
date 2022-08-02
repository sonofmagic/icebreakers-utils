# @icebreakers/sass-utils

## sass-utils

### @function

#### decimal-round

```scss
@use '@icebreakers/sass-utils' as index;

@include assert-equal(index.decimal-round(0.333), 0);
@include assert-equal(index.decimal-round(0.333, 1), 0.3);
@include assert-equal(index.decimal-round(0.333, 2), 0.33);
@include assert-equal(index.decimal-round(0.666), 1);
@include assert-equal(index.decimal-round(0.666, 1), 0.7);
@include assert-equal(index.decimal-round(0.666, 2), 0.67);
@include assert-equal(index.decimal-round(0.333, 0, ceil), 1);
@include assert-equal(index.decimal-round(0.666, 0, floor), 0);
```

#### remove-unit

```scss
@use '@icebreakers/sass-utils' as index;

@include assert-equal(index.remove-unit(10.1px), 10.1);
@include assert-equal(index.remove-unit(10.1), 10.1);
@include assert-equal(index.remove-unit(12vw), 12);
```

#### px2vw

```scss
@use '@icebreakers/sass-utils' as index;

@include assert-equal(index.px2vw(750px), 100vw);
@include assert-equal(index.px2vw(750), 100vw);
@include assert-equal(index.px2vw(750, 375), 200vw);
@include assert-equal(index.px2vw(750, 375px), 200vw);
```