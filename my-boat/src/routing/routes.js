import routeStructure from './route-structure';

const dynamicSymbols = ['*', ':'];

const buildRoute = (allPaths, { path, children, pageName }) => {
  if (children) {
    const childrenRoutesArr = Object.entries(children.reduce(buildRoute, {}));
    const fullChildrenRoutes = childrenRoutesArr
      .reduce((childrenRoutes, [childPageName, childPath]) => {
        const newChildrenRoutes = { ...childrenRoutes };
        newChildrenRoutes[childPageName] = path[path.length - 1] !== '/'
          ? `${path}/${childPath}`
          : path + childPath;

        return newChildrenRoutes;
      }, {});
    return {
      ...allPaths,
      ...fullChildrenRoutes,
    };
  }
  if (path !== null) {
    for (let i = 0; i < dynamicSymbols.length; i += 1) {
      const dynamicSymbol = dynamicSymbols[i];
      const includesDynamicSymbol = Array.from(path).includes(dynamicSymbol);
      if (includesDynamicSymbol) {
        return allPaths;
      }
    }
  }
  const newAllPaths = { ...allPaths };

  newAllPaths[pageName] = path ?? '';
  return newAllPaths;
};

const routes = routeStructure.reduce(buildRoute, {});

export default routes;
