/**
 * This is a modified version of Radix Primitives' Slot component.
 * It supports slottable children, which is useful for components that need to
 * render a slot inside a slot.
 *
 * It merges the initial implementation with the one that supports multiple children.
 *
 * See https://github.com/radix-ui/primitives/blob/main/packages/react/slot/src/Slot.tsx
 * for the original implementation.
 *
 * See https://github.com/radix-ui/primitives/blob/12e51326c7ddc7452916aabadf7db4a45352a6bd/packages/react/slot/src/Slot.tsx
 * for the variant that supports multiple children.
 */

import * as React from "react";

// https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/composeRefs.tsx
type PossibleRef<T> = React.Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (isSlottable(children)) {
    const slottable = children;

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {React.isValidElement<React.PropsWithChildren<unknown>>(
          slottable.props.child
        )
          ? React.cloneElement(
              slottable.props.child,
              undefined,
              slottable.props.children(slottable.props.child.props.children)
            )
          : null}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = "Slot";

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/

interface SlotCloneProps {
  children: React.ReactNode;
}

const SlotClone = React.forwardRef<any, SlotCloneProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (React.isValidElement(children)) {
      const childrenRef = getElementRef(children);

      return React.cloneElement(children, {
        ...mergeProps(slotProps, children.props as AnyProps),
        // @ts-ignore
        ref: forwardedRef
          ? composeRefs(forwardedRef, childrenRef)
          : childrenRef,
      });
    }

    return React.Children.count(children) > 1
      ? React.Children.only(children)
      : null;
  }
);

SlotClone.displayName = "SlotClone";

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

type SlottableProps = {
  child: React.ReactNode;
  children: (child: React.ReactNode) => React.JSX.Element;
};

const Slottable = ({ child, children }: SlottableProps) => {
  return children(child);
};

/* ---------------------------------------------------------------------------------------------- */

type AnyProps = Record<string, any>;

function isSlottable(
  child: React.ReactNode
): child is React.ReactElement<SlottableProps> {
  return React.isValidElement(child) && child.type === Slottable;
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(" ");
    }
  }

  return { ...slotProps, ...overrideProps };
}

// Before React 19 accessing `element.props.ref` will throw a warning and suggest using `element.ref`
// After React 19 accessing `element.ref` does the opposite.
// https://github.com/facebook/react/pull/28348
//
// Access the ref using the method that doesn't yield a warning.
function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // Not DEV
  return (element as any).ref || (element as any).props.ref;
}

const Root = Slot;

export { Root, Slot, Slottable };
export type { SlotProps };
