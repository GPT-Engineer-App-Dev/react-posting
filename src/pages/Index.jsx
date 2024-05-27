import { useState } from "react";
import { Container, VStack, HStack, Text, Textarea, Button, Box, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaLaugh, FaSadCry } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, { content: newPost, reactions: { like: 0, dislike: 0, laugh: 0, sad: 0 } }]);
      setNewPost("");
    }
  };

  const handleReaction = (index, reaction) => {
    const updatedPosts = [...posts];
    updatedPosts[index].reactions[reaction]++;
    setPosts(updatedPosts);
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
        <Button colorScheme="blue" onClick={handlePostSubmit}>Post</Button>
        <VStack spacing={4} width="100%">
          {posts.map((post, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text mb={2}>{post.content}</Text>
              <HStack spacing={4}>
                <HStack>
                  <IconButton
                    aria-label="Like"
                    icon={<FaThumbsUp />}
                    size="sm"
                    onClick={() => handleReaction(index, "like")}
                  />
                  <Text>{post.reactions.like}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Dislike"
                    icon={<FaThumbsDown />}
                    size="sm"
                    onClick={() => handleReaction(index, "dislike")}
                  />
                  <Text>{post.reactions.dislike}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Laugh"
                    icon={<FaLaugh />}
                    size="sm"
                    onClick={() => handleReaction(index, "laugh")}
                  />
                  <Text>{post.reactions.laugh}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    aria-label="Sad"
                    icon={<FaSadCry />}
                    size="sm"
                    onClick={() => handleReaction(index, "sad")}
                  />
                  <Text>{post.reactions.sad}</Text>
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