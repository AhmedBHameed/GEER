export const gqlArticals = {
   query:
   `
      {
         getArticals(limit: 15) {
            id,
            title,
            artical,
            category,
            category_name,
            image,
            author,
            author_name,
            status,
            date,
            rows
         }
      }
   `
};
