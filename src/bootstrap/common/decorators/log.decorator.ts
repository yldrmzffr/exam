export const LogMe =
  () =>
  (target: any, methodName: string, descriptor: any): void => {
    const className = target.constructor.name;
    const original = descriptor.value;

    descriptor.value = new Proxy(original, {
      async apply(target, thisArg, args) {
        if (thisArg.logger === undefined) {
          console.debug(
            `[${className}] ${methodName}`,
            `${JSON.stringify(args)}`,
          );
        }

        thisArg.logger.debug(
          `[${className}] ${methodName}`,
          `${JSON.stringify(args)}`,
        );

        return await target.apply(thisArg, args);
      },
    });
  };
