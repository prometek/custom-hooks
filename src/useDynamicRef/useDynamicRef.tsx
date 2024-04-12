import React, { useCallback, useRef, useEffect } from "react";

function useDynamicRefs<T>(depths: number[]): any {
  // Function to recursively create refs
  const createNestedRefs = useCallback(
    (depthArray: number[], depthIndex: number = 0): any => {
      // Base case: If we reach the final depth, return a ref
      if (depthIndex === depthArray.length - 1) {
        return Array.from({ length: depthArray[depthIndex] }, () =>
          React.createRef<T>()
        );
      }
      // Recursive case: Create nested arrays of refs
      return Array.from({ length: depthArray[depthIndex] }, () =>
        createNestedRefs(depthArray, depthIndex + 1)
      );
    },
    []
  ); // Dependency on the createNestedRefs function

  // Main refs object managed by the hook
  const refs = useRef<any>(createNestedRefs(depths));

  useEffect(() => {
    refs.current = createNestedRefs(depths);
  }, [createNestedRefs, depths]);

  return refs.current;
}

export default useDynamicRefs;
