const { Builder, By, Key, until } = require('selenium-webdriver');

async function testViewNote() {
    // Khởi tạo trình duyệt Chrome
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Mở trang danh sách ghi chú
        await driver.get('http://localhost:5173/notes');

        // Chờ cho đến khi các ghi chú xuất hiện
        await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Test Note Title')]")), 5000);

        // Tìm kiếm và nhấn vào ghi chú cần xem chi tiết
        let noteLink = await driver.findElement(By.xpath("//div[contains(text(), 'Test Note Title')]"));
        await noteLink.click();

        // Chờ cho đến khi điều hướng đến trang chi tiết ghi chú
        await driver.wait(until.urlContains('/notes/'), 5000);
        
        // Chờ cho đến khi chi tiết ghi chú xuất hiện
        await driver.wait(until.elementLocated(By.id('title')), 5000);
        await driver.wait(until.elementLocated(By.id('content')), 5000);

        // Kiểm tra xem chi tiết ghi chú đã được hiển thị hay chưa
        let noteTitle = await driver.findElement(By.id('title')).getAttribute('value');
        let noteContent = await driver.findElement(By.id('content')).getText();
        if (noteTitle === 'Test Note Title' && noteContent === 'This is the content of the test note.') {
            console.log('View note test passed');
        } else {
            console.log('View note test failed');
        }
    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Đóng trình duyệt
        await driver.quit();
    }
}

testViewNote();