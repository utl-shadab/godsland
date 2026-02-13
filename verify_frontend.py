from playwright.sync_api import sync_playwright, expect

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport
        context = browser.new_context(viewport={'width': 390, 'height': 844})
        page = context.new_page()

        # Navigate to Home
        print("Navigating to Home...")
        page.goto("http://localhost:5173")
        page.wait_for_timeout(8000)
        page.screenshot(path="/home/jules/verification/home_mobile_v3.png")

        # Navigate to Marketplace Browse Mode
        print("Navigating to Marketplace Browse Mode...")
        page.goto("http://localhost:5173/market/all")
        page.wait_for_timeout(8000)
        page.screenshot(path="/home/jules/verification/market_mobile_v3.png")

        # Open Filter Drawer
        print("Opening Filter Drawer...")
        page.click("button[aria-label='Filters']")
        page.wait_for_timeout(2000)
        page.screenshot(path="/home/jules/verification/filter_drawer_mobile_v3.png")

        # Desktop viewport
        print("Switching to Desktop viewport...")
        page.set_viewport_size({'width': 1440, 'height': 900})
        page.goto("http://localhost:5173/market/all")
        page.wait_for_timeout(8000)
        page.screenshot(path="/home/jules/verification/market_desktop_v3.png")

        browser.close()

if __name__ == "__main__":
    import os
    if not os.path.exists("/home/jules/verification"):
        os.makedirs("/home/jules/verification")
    verify_frontend()
