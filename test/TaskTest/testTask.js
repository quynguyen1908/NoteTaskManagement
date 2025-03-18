const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function testTaskFlow() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Bắt đầu quy trình kiểm thử toàn bộ Task Flow");

        // **Bước 1: Tạo Task mới**
        console.log("Đang tạo Task mới...");
        await driver.get('http://localhost:5173/create-task');
        await driver.sleep(2000);

        await driver.findElement(By.id('title')).sendKeys('Task Kiểm Thử Tổng Hợp');
     
        await driver.findElement(By.id('description')).sendKeys('Mô tả ban đầu.');
      
        await driver.findElement(By.id('place')).sendKeys('Địa điểm A');
       
        await driver.findElement(By.css('input[placeholder="Begin Date"]')).sendKeys('2026-03-17');
        
        await driver.findElement(By.css('input[placeholder="End Date"]')).sendKeys('2026-03-18');
       
        
        let saveButton = await driver.findElement(By.css('button[type="submit"]'));
        await saveButton.click();               await saveButton.click();
        await driver.sleep(2000);

        await driver.wait(until.urlContains('/tasks'), 5000);
        console.log("Đã chuyển đến danh sách Task.");
        await driver.sleep(2000);

        await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Task Kiểm Thử Tổng Hợp')]")), 5000);
        console.log("Xác nhận Task mới đã xuất hiện trong danh sách.");
        await driver.sleep(2000);

        console.log("Mở Task để chỉnh sửa...");
        let taskElement = await driver.findElement(By.xpath("//div[contains(text(), 'Task Kiểm Thử Tổng Hợp')]"));
        await taskElement.click();


        await driver.wait(until.urlContains('/tasks'), 5000);
      

        console.log("Chỉnh sửa nội dung Task...");
        let titleField = await driver.findElement(By.id('title'));
        await titleField.clear();
       
        await titleField.sendKeys('Task Đã Chỉnh Sửa');
    
        let descriptionField = await driver.findElement(By.id('description'));
        await descriptionField.clear();
       
        await descriptionField.sendKeys('Mô tả đã được cập nhật.');
       

        let placeField = await driver.findElement(By.id('place'));
        await placeField.clear();
    
        await placeField.sendKeys('Địa điểm B');
        await driver.sleep(2000);

        let saveEditButton = await driver.findElement(By.xpath("//button[contains(text(),'Save')]")); 
        await saveEditButton.click();
        await driver.sleep(2000);

        await driver.wait(until.urlContains('/tasks'), 5000);
        console.log("Đã lưu chỉnh sửa và quay lại danh sách Task.");
      

        

        console.log("Xác nhận Task đã được chỉnh sửa...");
        await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Task Đã Chỉnh Sửa')]")), 5000);
        console.log("Task đã chỉnh sửa thành công.");
       

        console.log("Đang xóa Task...");
        await driver.findElement(By.xpath("//div[contains(text(), 'Task Đã Chỉnh Sửa')]")).click();
        await driver.sleep(2000);
        let deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();
       

        console.log("Kiểm tra xem Task đã bị xóa hay chưa...");
        let deletedTask = await driver.findElements(By.xpath("//div[contains(text(), 'Task Đã Chỉnh Sửa')]"));
        assert.strictEqual(deletedTask.length, 0, 'Kiểm định thất bại: Task vẫn còn trong danh sách.');
        console.log("Kiểm thử thành công: Task đã bị xóa.");
    

    } catch (error) {
        console.error('Lỗi trong quá trình kiểm thử:', error);
        throw error;
    } finally {
        await driver.quit();
        console.log('Đã đóng trình duyệt.');
    }
}

testTaskFlow();
