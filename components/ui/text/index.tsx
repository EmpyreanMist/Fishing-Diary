import React from 'react';

import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { Text as RNText } from 'react-native';
import { textStyle } from './styles';

type ITextProps = React.ComponentProps<typeof RNText> &
  VariantProps<typeof textStyle>;

const Text = React.forwardRef<React.ComponentRef<typeof RNText>, ITextProps>(
  function Text(
    {
      className,
      isTruncated,
      bold,
      underline,
      strikeThrough,
      size = 'md',
      sub,
      italic,
      highlight,
      ...props
    },
    ref
  ) {
    const resolvedSize =
      typeof size === 'string' &&
      ([
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '2xs',
        '5xl',
        '6xl',
      ] as const).includes(size as any)
        ? (size as
            | 'xs'
            | 'sm'
            | 'md'
            | 'lg'
            | 'xl'
            | '2xl'
            | '3xl'
            | '4xl'
            | '2xs'
            | '5xl'
            | '6xl')
        : undefined;

    const numericStyle = typeof size === 'number' ? { fontSize: size } : undefined;

    return (
      <RNText
        className={textStyle({
          isTruncated: isTruncated as boolean,
          bold: bold as boolean,
          underline: underline as boolean,
          strikeThrough: strikeThrough as boolean,
          size: resolvedSize,
          sub: sub as boolean,
          italic: italic as boolean,
          highlight: highlight as boolean,
          class: className,
        })}
        {...props}
        style={numericStyle ? [numericStyle, props.style] : props.style}
        ref={ref}
      />
    );
  }
);

Text.displayName = 'Text';

export { Text };
