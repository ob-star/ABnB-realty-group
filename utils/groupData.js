// utilities/groupAndSortArticles.js

export function groupAndSortData(articles, tagName = null) {
    // If tagName is provided, filter and sort articles by the specific tag
    if (tagName) {
      const filteredArticles = articles.filter((article) => article.category === tagName);
  
      // Parse and sort articles by date and time
      filteredArticles.sort((a, b) => {
        const dateTimeA = new Date(`${a?.date}T${a?.time}`)||null;
        const dateTimeB = new Date(`${b?.date}T${b?.time}`)||null;
        return dateTimeB - dateTimeA; // Descending order
      });
  
      return [
        {
          title: tagName.charAt(0).toUpperCase() + tagName.slice(1), // Capitalize the tag
          articles: filteredArticles,
        },
      ];
    }
  
    // Group articles by tag
    const groupedArticles = articles.reduce((acc, article) => {
      // Parse date and time into a Date object for sorting
      const articleDateTime = new Date(`${article?.date}T${article?.time}`)||null;
      article.dateTime = articleDateTime||null;
  
      if (!acc[article?.category]) {
        acc[article?.category] = [];
      }
      acc[article?.category].push(article);
      return acc;
    }, {});
  
    // Sort articles within each group by date and time
    Object.keys(groupedArticles).forEach((tag) => {
      groupedArticles[tag].sort((a, b) => b.dateTime - a.dateTime); // Sort in descending order
    });
  
    // Convert grouped articles into an array of categories
    return Object.entries(groupedArticles).map(([tag, articles]) => ({
      title: tag.charAt(0).toUpperCase() + tag.slice(1), // Capitalize the tag for display
      articles,
    }));
  }
  