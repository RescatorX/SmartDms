
export class IntegrationSystemEntity {

    /**
	 * A unique code of the integration system.
	 */
	public code: string;

	/**
	 * A display name of the integration system.
	 */
    public displayName: string;
    
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
    public toString(): string {
		return "IntegrationSystem [code=" + this.code + ", displayName=" + this.displayName + "]";
	}
}
