export const getComponentImage = (componentName) => {

  try {

    return new URL(

      `../assets/components/${componentName
        .toLowerCase()
        .replaceAll(" ", "-")}.jpg`,

      import.meta.url

    ).href;

  }

  catch {

    return null;

  }

};