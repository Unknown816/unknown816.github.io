const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('before_post_render', function (data) {

  if (data.index_img) return data;

  const category = data.categories?.data?.[0]?.name?.toLowerCase();

  const map = {
    '读书笔记': 'source/img/covers/reading_notes',
  };

  const dir = map[category];

  if (!dir) {
    data.index_img = '/img/post_default.jpg';
    return data;
  }

  try {
    // 读取目录下所有文件
    const files = fs.readdirSync(path.join(process.cwd(), dir))
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

    if (!files.length) {
      data.index_img = '/img/post_default.jpg';
      return data;
    }

    // 随机选一张（不会越界）
    const file = files[Math.floor(Math.random() * files.length)];

    data.index_img = `/${dir.replace('source/', '')}/${file}`;

  } catch (e) {
    data.index_img = '/img/post_default.jpg';
  }

  return data;
});
