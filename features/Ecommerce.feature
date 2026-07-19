Feature: Place the Order

    Scenario: Placing Order
        Given A login to Ecommerce Application with "nikhil@nikhil.com" and "Nikhil@0777"
        When Add product "Zara Coat 3" to cart
        Then Verify "Zara Coat 3" is displayed in cart
        When Enter Valid details and place the order
        Then Verify order is present in OrderHistory Page