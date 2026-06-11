import AppButton from "@/components/ui/AppButton"
import AppContainer from "@/components/ui/AppContainer"
import PageLoader from "@/components/ui/PageLoader"
import { toaster } from "@/components/ui/toaster"
import { useConfirmOrderMutation } from "@/store/api/order.api"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [confirmOrder, { isLoading, isSuccess, isError }] = useConfirmOrderMutation()
    
    const isConfirmed = useRef(false)
    const orderId = searchParams.get('orderId')

    useEffect(() => {
        if (!orderId || isConfirmed.current) return
        
        isConfirmed.current = true

        const handleConfirm = async () => {
            try {
                await confirmOrder({ orderId: Number(orderId) }).unwrap()
                toaster.create({
                    title: 'Payment Successful!',
                    description: 'Your order has been paid and is now processing.',
                    type: 'success'
                })
            } catch {
                toaster.create({
                    title: 'Confirmation Error',
                    description: 'Failed to confirm your payment with the server.',
                    type: 'error'
                })
            }
        }

        handleConfirm()
    }, [orderId, confirmOrder])

    return (
      <Box py="80px" textAlign="center">
        <AppContainer>
          <Flex direction="column" align="center" justify="center" gap="24px">
            {isLoading && (
              <>
                <PageLoader />
                <Heading as="h1" fontSize="28px">
                  Verifying Payment...
                </Heading>
                <Text color="gray.500">Please wait while we confirm your transaction with Stripe.</Text>
              </>
            )}

            {isSuccess && (
              <>
                <Heading as="h1" fontSize="32px" color="green.500">
                  Thank You for Your Purchase!
                </Heading>
                <Text color="gray.600" maxW="500px">
                  Payment confirmed successfully. Your order **#{orderId}** has been placed and is being prepared for
                  delivery.
                </Text>
                <AppButton mt="20px" w="220px" h="50px" onClick={() => navigate("/")}>
                  Continue Shopping
                </AppButton>
              </>
            )}

            {isError && (
              <>
                <Heading as="h1" fontSize="32px" color="red.500">
                  Payment Verification Failed
                </Heading>
                <Text color="gray.600" maxW="500px">
                  Something went wrong while confirming your payment. Please contact our support if money was deducted.
                </Text>
                <AppButton mt="20px" w="220px" h="50px" onClick={() => navigate("/cart")}>
                  Return to Cart
                </AppButton>
              </>
            )}
          </Flex>
        </AppContainer>
      </Box>
    );
}

export default PaymentSuccessPage