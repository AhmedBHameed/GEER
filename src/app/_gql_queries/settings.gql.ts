export const gqlSettings = {
  query: `
    {
      getSettings {
        id,
        title,
        meta_name,
        meta_description,
        logo,
        slide_category_id,
        slide_post_num,
        session_time,
        banner_img,
        facebook,
        googleplus,
        youtube,
        twitter,
      }
    }
  `
}