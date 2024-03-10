import { AbstractResolver } from "./abstractResolver"
import { GlobalObserver } from "./globalObserver"
import { JavaResolver } from "./javaResolver"
import { StandaloneResolver } from "./standaloneResolver"
import { TestResolver } from "./testResolver"
import { WebsocketResolver } from "./websocketResolver"

export class ResolverFactory {
    private static instance: AbstractResolver

    public static readonly JAVA_RESOLVER = "JAVA_RESOLVER"

    public static readonly WEBSOCKET_RESOLVER = "WEBSOCKET_RESOLVER"

    public static readonly STANDALONE_RESOLVER = "STANDALONE_RESOLVER"

    public static readonly TEST_RESOLVER = "TEST_RESOLVER"

    public static initResolver(type: string) {
        if (this.instance != null)
            return;
        switch (type) {
            case ResolverFactory.JAVA_RESOLVER:
                this.instance = new JavaResolver()
                break
            case ResolverFactory.WEBSOCKET_RESOLVER:
                this.instance = new WebsocketResolver()
                break
            case ResolverFactory.STANDALONE_RESOLVER:
                this.instance = new StandaloneResolver()
                break
            case ResolverFactory.TEST_RESOLVER:
                this.instance = new TestResolver()
                break
            default:
                alert("Undefined remote resolver. Should use " + ResolverFactory.WEBSOCKET_RESOLVER + " or " + ResolverFactory.JAVA_RESOLVER)
        }
        var interval = setInterval(() => {
            if (this.instance.isInitiated()) {
                GlobalObserver.getInstance().observableResolverInit.notify(true)
                clearInterval(interval)
            }
        }, 200)
    }

    public static getResolver(): AbstractResolver {
        return this.instance
    }

}