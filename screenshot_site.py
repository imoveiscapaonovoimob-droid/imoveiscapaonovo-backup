from playwright.sync_api import sync_playwright
import os

# Output directory for screenshots
output_dir = r"C:\Users\lenin\Downloads\Imóveis Capão Novo\Imóveis Capão Novo Site"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1400, 'height': 900})

    # Navigate to homepage
    print("Navigating to http://localhost:3000...")
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')

    # Take full page screenshot
    screenshot_path = os.path.join(output_dir, "screenshot-homepage.png")
    page.screenshot(path=screenshot_path, full_page=True)
    print(f"Homepage screenshot saved to: {screenshot_path}")

    # Navigate to property detail page
    print("Navigating to property detail page...")
    page.goto('http://localhost:3000/imoveis/1')
    page.wait_for_load_state('networkidle')

    screenshot_path2 = os.path.join(output_dir, "screenshot-property.png")
    page.screenshot(path=screenshot_path2, full_page=True)
    print(f"Property page screenshot saved to: {screenshot_path2}")

    # Navigate to portfolio page
    print("Navigating to portfolio page...")
    page.goto('http://localhost:3000/portfolio')
    page.wait_for_load_state('networkidle')

    screenshot_path3 = os.path.join(output_dir, "screenshot-portfolio.png")
    page.screenshot(path=screenshot_path3, full_page=True)
    print(f"Portfolio page screenshot saved to: {screenshot_path3}")

    browser.close()
    print("Done!")