    async function loadHashContent() {
      try {
        // 获取hash值，去掉#号
        let hash = window.location.hash.substring(1);
        
        // 如果hash为空或只包含#，默认加载home.html
        if (!hash || hash === '') {
          hash = 'home.html';
        }
        
        // 确保hash以.html结尾，否则添加.html扩展名
        if (!hash.endsWith('.html') && !hash.includes('.')) {
          hash += '.html';
        }
        
        // 从当前目录读取文件
        const response = await fetch('./' + hash);
        
        if (!response.ok) {
          throw new Error(`文件不存在: ${hash}`);
        }
        
        const content = await response.text();
        document.write(content);
        
      } catch (error) {
        console.error('加载失败:', error);
        document.write('<h1>页面未找到</h1><p>无法加载: ' + window.location.hash.substring(1) + '</p>');
      }
    }

    // 页面加载时执行
    loadHashContent();

    // 监听hash变化
    window.addEventListener('hashchange', function() {
      // 重新加载页面以获取新内容
      loadHashContent();
    });