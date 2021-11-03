const outline = (ctx) => {
  var query = ctx.pageUrl;
  const url = "https://api.outline.com/v3/parse_article?source_url=" + encodeURI(query);
  console.log(url);
  fetch(url).then(r => r.json()).then(({ data }) => {
    const outlineUrl = `https://outline.com/${data.short_code}`;
    console.log(outlineUrl);

    chrome.tabs.create({ url: outlineUrl });
    console.log(data);
  }).catch(e => {
    alert('Unable to outline ' + query);
    console.log('outliner error:', e);
  });

};

chrome.contextMenus.create({
  "id": "outlinerContextMenu",
  title: "Outline it!",
  contexts: ["page"],  // ContextType
});

chrome.contextMenus.onClicked.addListener(outline);