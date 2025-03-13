const { Builder, By, Key, until } = require('selenium-webdriver');

async function testDeleteNote() {
    // Khởi tạo trình duyệt Chrome
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Mở trang danh sách ghi chú
        await driver.get('http://localhost:5173/notes');

        // Chờ cho đến khi các ghi chú xuất hiện
        await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Updated Test Note Title')]")), 5000);

        // Tìm kiếm và nhấn vào ghi chú cần xóa
        let noteLink = await driver.findElement(By.xpath("//div[contains(text(), 'Updated Test Note Title')]"));
        await noteLink.click();

        // Chờ cho đến khi điều hướng đến trang chi tiết ghi chú
        await driver.wait(until.urlContains('/notes/'), 5000);

        // Chờ cho đến khi chi tiết ghi chú xuất hiện
        await driver.wait(until.elementLocated(By.id('title')), 5000);

        // Tìm kiếm nút Delete và nhấn vào nút
        let deleteButton = await driver.findElement(By.id('btn-delete'));
        await deleteButton.click();

        // Chờ cho đến khi modal xác nhận xuất hiện
        await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(), 'Confirm Delete')]")), 5000);

        // Tìm kiếm nút Delete trong modal và nhấn vào nút
        let confirmDeleteButton = await driver.findElement(By.id('btn-confirm-delete'));
        await confirmDeleteButton.click();

        // Chờ cho đến khi điều hướng đến trang danh sách ghi chú
        await driver.wait(until.urlContains('/notes'), 5000);

        // Chờ cho phần tử ul hiện lên
        await driver.wait(until.elementLocated(By.id('note-list')), 5000);

        // Kiểm tra xem ghi chú đã được xóa thành công hay chưa
        let noteExists = await driver.findElements(By.xpath("//div[contains(text(), 'Updated Test Note Title')]"));
        if (noteExists.length === 0) {
            console.log('Delete note test passed');
        } else {
            console.log('Delete note test failed');
        }
    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Đóng trình duyệt
        await driver.quit();
    }
}

testDeleteNote();