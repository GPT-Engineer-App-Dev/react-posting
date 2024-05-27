import { useState } from "react";
import { Container, VStack, HStack, Text, Textarea, Button, Box, IconButton, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaLaugh, FaSadCry } from "react-icons/fa";
import { usePosts, useAddPost, useAddReaction } from "../integrations/supabase/api";

const Index = () => {
  const [newPost, setNewPost] = useState("");
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts();
  const addPostMutation = useAddPost();
  const addReactionMutation = useAddReaction();

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ title: newPost, body: newPost });
      setNewPost("");
    }
  };

  const handleReaction = (postId, reaction) => {
    addReactionMutation.mutate({ post_id: postId, user_id: "anonymous", emoji: reaction });
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">Public Postboard</Text>
        <Textarea
          placeholder="Write your post here..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          size="sm"
        />
        <Button colorScheme="blue" onClick={handlePostSubmit} isLoading={addPostMutation.isLoading}>Post</Button>
        {postsLoading && <Spinner />}
        {postsError && (
          <Alert status="error">
            <AlertIcon />
            {postsError.message}
          </Alert>
        )}
        <VStack spacing={4} width="100%">
          {posts && posts.map((post) => (
            <Box key={post.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text mb={2}>{post.body}</Text>
              <HStack spacing={4}>
                <HStack>
                  <IconButton
                    aria-label="Like"
                    icon={<FaThumbsUp />}
                    size="sm"
                    onClick={() => handleReaction(post.id, "👍")}
                  />
                  <Text>{post.reactions?.filter(r => r.emoji === "👍").length || 0}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Dislike"
                    icon={<FaThumbsDown />}
                    size="sm"
                    onClick={() => handleReaction(post.id, "👎")}
                  />
                  <Text>{post.reactions?.filter(r => r.emoji === "👎").length || 0}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Laugh"
                    icon={<FaLaugh />}
                    size="sm"
                    onClick={() => handleReaction(post.id, "😂")}
                  />
                  <Text>{post.reactions?.filter(r => r.emoji === "😂").length || 0}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Sad"
                    icon={<FaSadCry />}
                    size="sm"
                    onClick={() => handleReaction(post.id, "😢")}
                  />
                  <Text>{post.reactions?.filter(r => r.emoji === "😢").length || 0}</Text>
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;