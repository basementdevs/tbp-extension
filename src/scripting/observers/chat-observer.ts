import MessageQueue from "@/scripting/queue";

const TWITCH_CHAT_CONTAINER = "chat-line__message";
const SEVEN_TV_CHAT_CONTAINER = "seventv-message";
const CHAT_CONTAINER = [TWITCH_CHAT_CONTAINER, SEVEN_TV_CHAT_CONTAINER];

export default class ChatMutationObserver {
  private observer: MutationObserver;

  private queue: MessageQueue;
  private messagesBatch: HTMLElement[];
  private debounceMessageTimer: number;
  private debounceProcessedNodesTimer: number;
  private processedNodes: Set<HTMLElement> = new Set();
  private readonly debounceInterval: number;

  constructor() {
    this.queue = new MessageQueue();
    this.messagesBatch = [];
    this.debounceInterval = 5; // 5 milliseconds

    this.processMutation = this.processMutation.bind(this);
  }

  public start(node: Node, config: MutationObserverInit) {
    this.observer = new MutationObserver(this.processMutation);
    this.observer.observe(node, config);
  }

  public stop() {
    this.observer.disconnect();
  }

  /** Stops  */
  private debounceProcessedNodes() {
    if (this.debounceProcessedNodesTimer) {
      clearTimeout(this.debounceProcessedNodesTimer);
    }

    this.debounceProcessedNodesTimer = window.setTimeout(() => {
      this.processedNodes.clear();
    }, this.debounceInterval * 20);
  }

  private debounceProcessBatch() {
    if (this.debounceMessageTimer) {
      clearTimeout(this.debounceMessageTimer);
    }

    this.debounceMessageTimer = window.setTimeout(() => {
      this.processBatch();
      this.debounceProcessedNodes();
    }, this.debounceInterval); // Adjust the delay as needed
  }

  private processBatch() {
    if (this.messagesBatch.length === 0) {
      return;
    }

    for (const message of this.messagesBatch) {
      this.queue.addMessage(message);
    }
    this.messagesBatch = [];
  }

  private processMutation(mutations: MutationRecord[]) {
    // Check if the first mutation's previous sibling is a span element
    // @ts-ignore
    if (mutations[0].previousSibling?.localName === "span") {
      return;
    }
    console.log("TBP: Mutation detected");

    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        //console.log("Not a childList mutation")
        continue;
      }

      // biome-ignore lint/complexity/noForEach: There are that many nodes, so there is no performance penalty here
      mutation.addedNodes.forEach((addedNode) => {
        if (!(addedNode instanceof HTMLElement)) {
          return;
        }

        if (this.processedNodes.has(addedNode)) {
          return; // Skip already processed nodes
        }

        for (const container of CHAT_CONTAINER) {
          if (addedNode.classList.contains(container)) {
            console.log("TBP: Added node detected");
            this.messagesBatch.push(addedNode);
            this.processedNodes.add(addedNode);
          }
        }
      });
    }

    this.debounceProcessBatch();
  }
}
