import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  //data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
    //user is  logged in
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            create post{" "}
          </Button>
        </NextLink>
        <Box mr={2}> {data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          onClick={async () => {
            await logout();
            router.reload();
          }}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex position="sticky" top={0} zIndex={1} bg="tan" p={4}>
      <Flex flex={1} m="auto" maxW={800} align="center">
        <NextLink href="/">
          <Link>
            <Heading> LiRedit</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}> {body}</Box>
      </Flex>
    </Flex>
  );
};
